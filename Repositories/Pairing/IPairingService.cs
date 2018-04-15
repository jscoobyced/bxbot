namespace bxbot
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPairingService
    {
        Task<IEnumerable<Pairing>> GetPairingAsync(int id, int interval);
    }
}