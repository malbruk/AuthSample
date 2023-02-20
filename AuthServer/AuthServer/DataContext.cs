using System.Text.Json;

namespace AuthServer
{
    public class User
    {
        public int Id { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string Name { get; set; }

        public string Role { get; set; }
    }

    public class Session
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string DateTime { get; set; }

        public string IP { get; set; }

        public bool IsValid { get; set; }
    }

    public class DataContext
    {
        public List<User>? Users { get; set; }

        public List<Session>? Sessions { get; set; }

        public DataContext()
        {
            string usersJson = File.ReadAllText(@"./users.json");
            this.Users = JsonSerializer.Deserialize<IEnumerable<User>>(usersJson)?.ToList();

            string sessionsJson = File.ReadAllText(@"./sessions.json");
            this.Sessions = JsonSerializer.Deserialize<IEnumerable<Session>>(sessionsJson)?.ToList();
        }
    }
}
