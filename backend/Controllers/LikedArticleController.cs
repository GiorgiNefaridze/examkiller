using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class LikedArticleController : ControllerBase
{
    private readonly ExamKillerDbContext _context;

    public LikedArticleController(ExamKillerDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] LikedArticleDto likedArticleRequest)
    {
        (int articleId,int userId) = likedArticleRequest;

        LikedArticle? likedArticle = await _context.LikedArticles.FirstOrDefaultAsync(la => la.ArticleId == articleId && la.UserId == userId);
       
        if(likedArticle == null)
        {
            LikedArticle newlikedArticle = likedArticleRequest.Adapt<LikedArticle>();
            await _context.LikedArticles.AddAsync(newlikedArticle);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        _context.LikedArticles.Remove(likedArticle);
        await _context.SaveChangesAsync();
        return Ok(false);
    }
}