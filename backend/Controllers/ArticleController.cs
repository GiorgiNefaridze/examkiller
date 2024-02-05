using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/[controller]")]
[ApiController]
public class ArticleController : ControllerBase
{
    private readonly ExamKillerDbContext _context;

    public ArticleController(ExamKillerDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromQuery] int roomId, [FromQuery] int userId)
    {
        var articles = _context.Articles
            .Where(a => a.RoomId == roomId)
            .Select(a =>
                new
                {
                    ArticleId = a.ArticleId,
                    Title = a.Title,
                    Content = a.Content,
                    Date = a.Date,
                    isLiked = _context.LikedArticles.Any(la => la.ArticleId ==  a.ArticleId && la.UserId == userId),
                    Owner = _context.Users
                    .Where(u => u.UserId == a.OwnerId)
                    .Select(u => u.Nickname)
                    .FirstOrDefault(),
                    IsOwner = userId == a.OwnerId,
                    Likes = _context.LikedArticles
                    .Where(la => la.ArticleId == a.ArticleId)
                    .Select(la => new 
                    {
                        Nickname = _context.Users.Where(u => u.UserId == la.UserId).Select(u => u.Nickname).FirstOrDefault(),
                        Email = _context.Users.Where(u => u.UserId == la.UserId).Select(u => u.Email).FirstOrDefault()
                    })
                    .ToList()
                })
            .ToList();

        if (articles == null)
        {
            return BadRequest(new { ErrorMessage = "There is no Articles" });
        }

        return Ok(new { Response = articles });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ArticleDto articleRequest)
    {
        (string title, string content, int ownerId, int roomId) = articleRequest;

        var article = articleRequest.Adapt<Article>();

        if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(content))
        {
            return BadRequest(new { ErrorMessage = "Please fill inputs" });
        }

        Task<bool> isExists = _context.Articles.Where(a => a.RoomId == roomId).AnyAsync(a => a.Title == title);

        if (isExists.Result)
        {
            return BadRequest(new { ErrorMessage = "Try with other title,with this already exists" });
        }

        _context.Articles.Add(article);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "Created" });
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete([FromQuery] int userId, [FromQuery] int articleId)
    {
        Article? isUserAllowed = await  _context.Articles.Where(a => a.ArticleId == articleId)
        .FirstOrDefaultAsync(a => a.OwnerId == userId);

        if(isUserAllowed == null)
        {
            return BadRequest(new { ErrorMessage = "You dont have a permission to delete this article" });
        }

        _context.Articles.Remove(isUserAllowed);
        await _context.SaveChangesAsync();

        return Ok(new { Response = "Deleted" });
    }
}