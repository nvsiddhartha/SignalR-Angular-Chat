using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinRoom(string room, string sender)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync(
                "ChatMessage",
                new Message(sender, " Joined.", true));
        }

        public async Task LeaveRoom(string room, string sender)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync(
                "ChatMessage",
                new Message(sender, " Left.", true));
        }

        public async Task Message(string room, Text text)
        {
            await Clients.Group(room).SendAsync(
                "ChatMessage",
                new Message(text.Sender, text.Content, false));
        }
    }
}
