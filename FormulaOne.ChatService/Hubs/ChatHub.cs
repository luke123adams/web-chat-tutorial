using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _shared;

    public ChatHub(SharedDb shared) => _shared = shared;
    public async Task JoinChat(UserConnection conn)
    {
    await Clients.All//IClientProxy
    .SendAsync(method:"ReceiveMessage", arg1: "admin", arg2:$"{conn.Username} has joined");
    }


    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
          await Groups.AddToGroupAsync(Context.ConnectionId, groupName:conn.ChatRoom);

          await Clients.Group(conn.ChatRoom) //IClientProxy
          .SendAsync(method:"JoinSpecificChatRoom", arg1:"admin", arg2:$"{conn.Username} has joined {conn.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom)
            .SendAsync(method: "ReceiveSpecificMessage", arg1: conn.Username, arg2: msg);
        }
    }
}