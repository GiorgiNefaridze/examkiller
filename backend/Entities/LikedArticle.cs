using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class LikedArticle
{
    [Key]
    public int LikedArticleId { get; set; }

    [ForeignKey("Article")]
    public int ArticleId { get; set; }
    public Article Article { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}