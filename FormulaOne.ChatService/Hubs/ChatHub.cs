using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection conn)
    {
    await Clients.All//IClientProxy
    .SendAsync(method:"ReceiveMessage", arg1: "admin", arg2:$"{conn.Username} has joined");
    }

    public async Task JoinSpecificChatroom(UserConnection conn)
    {
          await Groups.AddToGroupAsync(Context.ConnectionId, groupName:conn.ChatRoom);

          await Clients.Group(conn.ChatRoom)
          .SendAsync(method:"ReceiveMessage", arg1:"admin", arg2:$"{conn.Username} has joined {conn.ChatRoom}");
    }
}