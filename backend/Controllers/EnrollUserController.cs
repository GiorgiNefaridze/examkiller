using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/[controller]")]
[ApiController]
public class EnrollUserController : ControllerBase
{
    private readonly ExamKillerDbContext _context;

    public EnrollUserController(ExamKillerDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] EnrollUserDto enrollUserRequest)
    {
        EnrollUser enrollUser = enrollUserRequest.Adapt<EnrollUser>();

        Task<EnrollUser> isExists = _context.EnrollUsers.FirstOrDefaultAsync(eu => eu.RoomId == enrollUserRequest.RoomId && eu.UserId == enrollUserRequest.UserId );

        if(isExists.Result != null)
        {
            return BadRequest(new {ErrorMessage = "You are already enrolled in this room"});
        }

        _context.EnrollUsers.Add(enrollUser);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "Enrolled successfully" });
    }
}