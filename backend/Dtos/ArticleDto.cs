public class ArticleDto
{
    public int ArticleId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int OwnerId{ get; set; }
    public int RoomId { get; set; }
    public DateTime Date { get; set; }

    public ArticleDto()
    {
        Date = DateTime.Now.ToUniversalTime();
    }
    
    public void Deconstruct(out string title, out string content, out int ownerId, out int roomId)
    {
        title = this.Title;
        content = this.Content;
        ownerId = this.OwnerId;
        roomId = this.RoomId;
    }
}