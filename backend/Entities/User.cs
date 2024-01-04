using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserId { get; set; }
    public string Nickname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
}