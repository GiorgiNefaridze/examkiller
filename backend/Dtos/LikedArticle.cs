public class LikedArticleDto
{
    public int ArticleId { get; set; }
    public int UserId { get; set; }

    public void Deconstruct(out int articleId, out int userId)
    {
        articleId = this.ArticleId;
        userId = this.UserId;
    }
}