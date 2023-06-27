import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.graph_objects as go

# Data
years_reddit = [2012, 2013, 2014, 2015, 2017, 2018, 2019]
users_reddit = [46, 90, 174, 199, 250, 330, 430]
years_instagram = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
users_instagram = [150, 300, 400, 600, 800, 1000, 1210, 1520, 1890, 2000]
years_facebook = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
users_facebook = [1230, 1390, 1590, 1860, 2130, 2320, 2500, 2800, 2910, 2960, 2990]

app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Graph(id='graph'),
    dcc.Checklist(
        id='checkbox',
        options=[{'label': 'Reddit', 'value': 'reddit'}, 
                 {'label': 'Instagram', 'value': 'instagram'},
                 {'label': 'Facebook', 'value': 'facebook'}],
        value=['reddit', 'instagram', 'facebook']
    ),
])

@app.callback(
    Output('graph', 'figure'),
    [Input('checkbox', 'value')]
)
def update_figure(selected_platforms):
    traces = []
    if 'reddit' in selected_platforms:
        traces.append(go.Scatter(x=years_reddit, y=users_reddit, mode='lines+markers', name='Reddit', line=dict(color='orange')))
    if 'instagram' in selected_platforms:
        traces.append(go.Scatter(x=years_instagram, y=users_instagram, mode='lines+markers', name='Instagram', line=dict(color='pink')))
    if 'facebook' in selected_platforms:
        traces.append(go.Scatter(x=years_facebook, y=users_facebook, mode='lines+markers', name='Facebook', line=dict(color='blue')))

    return {
        'data': traces,
        'layout': go.Layout(
            title='Number of Users Over Time',
            xaxis={'title': 'Year', 'range': [min(years_reddit + years_instagram + years_facebook), max(years_reddit + years_instagram + years_facebook)]},
            yaxis={'title': 'Number of Users (in millions)', 'range': [0, max(users_reddit + users_instagram + users_facebook)]},
            showlegend=True
        )
    }

if __name__ == '__main__':
    app.run_server(debug=True)





