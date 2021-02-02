import React, {ReactElement, useState} from 'react';
import {useSelector} from 'react-redux';
import {HashRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import {List, Grid, Segment} from 'semantic-ui-react';
import {RootState} from './store/reducer';
import {RealBookHeader} from './RealBookHeader';
import {RealBookPlaylist} from './RealBookPlaylist';
import Chart from './Chart';
import {RealBookAnalyzeCharts} from './RealBookAnalyzeCharts';

const playlists = ['jazz', 'latin', 'pop'];

const RealBook: React.FunctionComponent = React.memo(() => {
    const {
        displayType,
        showAnalyzeSegment
    } = useSelector((state: RootState) => state.library);
    const playlistLinks: ReactElement[] = [];
    const playlistRoutes: ReactElement[] = [];
    const [displayTip, setDisplayTip] = useState(false);

    function handleMouseEnterTip() {
        setDisplayTip(true);
    }

    function handleMouseLeaveTip() {
        setDisplayTip(false);
    }

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
                        {
                            showAnalyzeSegment
                                ? null
                                : (
                                    <Segment
                                        basic
                                        inverted={displayTip}
                                        textAlign={'right'}
                                        onMouseEnter={handleMouseEnterTip}
                                        onMouseLeave={handleMouseLeaveTip}
                                    >
                                        {'Type anything to filter songs by title or author'}<br />
                                        <i style={{textDecoration: 'underline'}}>{'key:Bb-'}</i>
                                        {' to filter by key'}<br />
                                        <i style={{textDecoration: 'underline'}}>{'style:swing'}</i>
                                        {' to filter by style'}<br />
                                        <i style={{textDecoration: 'underline'}}>{'author:Chick'}</i>
                                        {' to filter by author'}
                                    </Segment>
                                )
                        }
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
});

export default RealBook;
