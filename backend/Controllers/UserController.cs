
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ExamKillerDbContext _context;
    private readonly IPasswordHashingService _passwordHashService;

    public UserController(ExamKillerDbContext context,IPasswordHashingService passwordHashService)
    {
        _context = context;
        _passwordHashService = passwordHashService;
    }

    [HttpGet("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromQuery] string Email,[FromQuery] string Password)
    {
        if(string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
        {
            return BadRequest(new { ErrorMessage = "Enter valid data" });
        }

        bool isExists = await IsUserExists(Email); 

        if(!isExists)
        {
            return BadRequest(new { ErrorMessage = "User with this credentials does not exists" });
        }

        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);   

        if (user == null || ! _passwordHashService.VerifyPassword(Password, user.Password))
        {
            return BadRequest(new { ErrorMessage = "Incorrect credentials" });
        }

        return Ok(new { Response = user });

    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        bool isExists = await IsUserExists(user.Email);

        if(isExists) 
        {
            return BadRequest(new { ErrorMessage = "User with this email already exists" });
        }

        user.Password = _passwordHashService.HashPassword(user.Password);

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "User created successfully" });
    }

    private async Task<bool> IsUserExists(string email){
        return await _context.Users.AnyAsync(u => u.Email == email);
    }
}