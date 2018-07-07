import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFUVTBNREV6UkRSQ09UQXhSRUZGTURCRVJqTTJRalk1TmpjMU1VRkROak5FUlVNeU9UVXpNZyJ9.eyJpc3MiOiJodHRwczovL2VsaXRlY2FwaXRhbHJlc2VhcmNoLmF1dGgwLmNvbS8iLCJzdWIiOiJGaTRLcWxINzZoU1RJRzQzQzVoVWxPUnZwWWNGT3hRcEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9lY3Itc2lnbmFscnNlcnZlci10ZXN0LmF6dXJld2Vic2l0ZXMubmV0IiwiaWF0IjoxNTMwODA0MDQ3LCJleHAiOjE1MzA4OTA0NDcsImF6cCI6IkZpNEtxbEg3NmhTVElHNDNDNWhVbE9SdnBZY0ZPeFFwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ZKo0W64ksdpt5NyoKcP5NxWUhSxg6FpESyn4oe7mAUmj7V3a-u_tIR5rPRBD-nIUgHdjegJa8uEqtDmBKhZlciZL73AXjX1eQJ1or_cGGnd3pqmHeJqW-HwKYFyZQLjS04qsMbg69w5oLwlADJUEldzqRliAdXn0xK2TvuEKy5RWZY2vTc2gfF1HTmU4vcNItTB4jbCG1l8Xv-m4X0lxmK3-VGyqE8cn3oAsc5XfiR1ohf3lRVOa--hnJO2-ZOn3D6s_TYKyrbXBCqlRFcchERrTkA82k1Zz_FgekwkVm7IZnYrhOx5_1mlURLJ6G0wQf0ysBFcoLIh8kaocG1PwtQ';

    const tokenValue = '?token=' + token;
    const realtimeServer = 'https://ecr-signalr-server.azurewebsites.net/';

    const portfolioConnection = new signalR.HubConnectionBuilder()
                      .withUrl(`${realtimeServer}portfolio${tokenValue}`)
                      .configureLogging(signalR.LogLevel.Trace)
                      .build();
          portfolioConnection.start()
            .then(function() {
              portfolioConnection.invoke('getGeneralStats');
              portfolioConnection.invoke('getPositionsStats');
              console.log('Portfolio Client Connected');
            }).catch(err => console.error(err.toString()));


            portfolioConnection.on('portfolioGetGeneralStatsResult', (data: any) => {
              const received = `Received: ${data}`;
              console.log(received);
              });
              
            portfolioConnection.on('PortfolioGetPositionsStatsResult', (data: any) => {
              const received = `Received: ${data}`;
              console.log(received);
              });

    const recommendationsConnection = new signalR.HubConnectionBuilder()
              .withUrl(`${realtimeServer}portfolio${tokenValue}`)
              .configureLogging(signalR.LogLevel.Trace)
              .build();

            recommendationsConnection.start()
              .then(function() {
                console.log('Recommendations Client Connected');
              }).catch(err => console.error(err.toString()));


            recommendationsConnection.on('RecommendationsSendRecomendationsResult', (data: any) => {
              const received = `Received: ${data}`;
              console.log(received);
              });

    const tradersConnection = new signalR.HubConnectionBuilder()
                        .withUrl(`${realtimeServer}traders${tokenValue}`)
                        .configureLogging(signalR.LogLevel.Trace)
                        .build();

          tradersConnection.start()
              .then(function() {
                tradersConnection.invoke('getGeneralStats');
                tradersConnection.invoke('getTradersStats');
                console.log('Traders Client Connected');
              }).catch(err => console.error(err.toString()));


          tradersConnection.on('tradersGetGeneralStatsResult', (data: any) => {
            const received = `Received: ${data}`;
            console.log(received);
            });

          tradersConnection.on('tradersGetTradersStatsResult', (data: any) => {
            const received = `Received: ${data}`;
            console.log(received);
            });
}
}
