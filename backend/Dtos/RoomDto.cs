public class RoomDto
{
    public int RoomId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public int OwnerId { get; set; }

    public void Deconstruct(out int roomId, out string name, out string type, out string description, out int ownerId)
    {
        roomId = RoomId;
        name = Name;
        type = Type;
        description = Description;
        ownerId = OwnerId;
    }
}