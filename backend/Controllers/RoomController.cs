using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/[controller]")]
[ApiController]
public class RoomController : ControllerBase
{
    private readonly ExamKillerDbContext _context;

    public RoomController(ExamKillerDbContext context)
    {
        _context = context;
    }

    [HttpGet("user/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromRoute] int userId)
    {
        List<EnrollUser> enrollUsers = _context.EnrollUsers.ToList();

       var simpleRooms = _context.Rooms
        .Select(r => new
        {
            RoomId = r.RoomId,
            Name = r.Name,
            Type = r.Type,
            Description = r.Description,
            OwnerId = r.User.UserId
        })
        .ToList();

        var rooms = simpleRooms
        .Select(r => new {
            RoomId = r.RoomId,  
            Name = r.Name,
            Type = r.Type,
            Description = r.Description,
            Owner = _context.Users
            .Where(u => u.UserId == r.OwnerId)
            .Select(u => new {
                Nickname = u.Nickname,
                Email = u.Email,
            })
            .FirstOrDefault(),
            IsJoined = enrollUsers.Any(eu => eu.RoomId == r.RoomId && eu.UserId == userId)
        })
        .ToList();

        if (rooms.Count == 0)
        {
            return BadRequest(new { ErrorMessage = "There is no room" });
        }

        return Ok(new { Response = rooms });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] RoomDto roomRequest)
    {
        var room = roomRequest.Adapt<Room>();

        (int roomId, string name, string type, string description, int ownerId) = roomRequest;

        if(string.IsNullOrEmpty(name) 
        || string.IsNullOrEmpty(type) 
        || string.IsNullOrEmpty(description))
        {
            return BadRequest(new { ErrorMessage = "All fields are required" });
        }

        bool isExists = _context.Rooms.Any(r => r.Name == name);

        if (isExists)
        {
            return BadRequest(new { ErrorMessage = $"Room with this name - {name} already exists" });
        }

        string role = _context.Users.FirstOrDefault(u => u.UserId == ownerId).Role;

        if(role != "Lead")
        {
            return BadRequest(new { ErrorMessage = "You do not have a permission" });
        }

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "Room created successfully" });
    }
}