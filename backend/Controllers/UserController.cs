
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ExamKillerDbContext _context;

    public UserController(ExamKillerDbContext context)
    {
        _context = context;
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

        IQueryable<User>? isExists = _context.Users.Where(u => u.Email == Email);

        if(isExists == null)
        {
            return BadRequest(new { ErrorMessage = "User with this credentials does not exists" });
        }

        User? user = _context.Users.FirstOrDefault(u => u.Email == Email && u.Password == Password);

        if (user == null)
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
        bool isExists = await _context.Users.AnyAsync(u => u.UserId == user.UserId);

        if(isExists) 
        {
            return BadRequest(new { ErrorMessage = "User with this email already exists" });
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "User created successfully" });
    }
}