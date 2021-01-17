import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {HashRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import {List, Grid} from 'semantic-ui-react';
import {RootState} from './store/reducer';
import {RealBookHeader} from './RealBookHeader';
import {RealBookPlaylist} from './RealBookPlaylist';
import Chart from './Chart';
import {RealBookAnalyzeCharts} from './RealBookAnalyzeCharts';

const playlists = ['jazz', 'latin'];

const RealBook: React.FunctionComponent = () => {
    const {
        displayType,
        showAnalyzeSegment
    } = useSelector((state: RootState) => state.library);
    const playlistLinks: ReactElement[] = [];
    const playlistRoutes: ReactElement[] = [];

    playlists.forEach((playlist, key) => {
        playlistLinks.push(
            <List.Item
                as={NavLink}
                key={key}
                to={`/${playlist}`}
                activeClassName={'active disabled'}
            >
                {`#${playlist}`}
            </List.Item>
        );
        playlistRoutes.push(
            <Route path={`/${playlist}`} key={key}>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <List horizontal>{playlistLinks}</List>
                        <RealBookPlaylist name={playlist} />
                    </Grid.Column>
                    <Grid.Column>
                        {showAnalyzeSegment ? <RealBookAnalyzeCharts /> : null}
                    </Grid.Column>
                </Grid>
            </Route>
        );
    });

    return (
        <HashRouter>
            <div className="realbook">
                <RealBookHeader
                    displayType={displayType}
                    header="Real Book"
                />
                <Switch>
                    <Route path={'/:playlist/:songId'} component={Chart} />
                    {playlistRoutes}
                    <Route exact path={'/'}>
                        <Redirect to={`/${playlists[0]}`} />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    );
};

export default RealBook;
