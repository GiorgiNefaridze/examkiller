using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Room
{
    [Key]
    public int RoomId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }

    [ForeignKey("User")]
    public int OwnerId { get; set; }
    public User User { get; set; }
}