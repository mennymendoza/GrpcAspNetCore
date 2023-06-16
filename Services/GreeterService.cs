using Grpc.Core;

namespace GrpcAspNetCore.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly string[] _streamMessages = new[]
    {
        "This is a server event.",
        "This is another server event.",
        "This is yet another server event."
    };
    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = $"Hello {request.Name}!"
        });
    }

    public override async Task ServerEvents(ServerEventsRequest request, IServerStreamWriter<ServerEventsMessage> responseStream, ServerCallContext context)
    {
        _logger.Log(LogLevel.Information, "Streaming to client...");
        for (int i = 0; i < 30; i++)
        {
            if (context.CancellationToken.IsCancellationRequested) {
                return;
            }

            ServerEventsMessage response = new ServerEventsMessage()
            {
                Message = _streamMessages[i % 3],
                Severity = "info"
            };
            await responseStream.WriteAsync(response);
            await Task.Delay(1000);
        }
    }
}
