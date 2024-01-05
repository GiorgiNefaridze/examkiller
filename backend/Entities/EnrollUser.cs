using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class EnrollUser
{
    [Key]
    public int EnrollUserId { get; set; }

    [ForeignKey("Room")]
    public int RoomId { get; set; }
    public Room Room { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}