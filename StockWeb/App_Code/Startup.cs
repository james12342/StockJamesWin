using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StockWeb.Startup))]
namespace StockWeb
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
