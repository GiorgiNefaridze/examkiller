public interface IPasswordHashingService
{
    string HashPassword(string plainPassword);
    bool VerifyPassword(string plainPassword, string hashedPassword);
}