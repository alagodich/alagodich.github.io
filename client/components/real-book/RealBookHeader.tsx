import React, {ReactElement} from 'react';
import {Header, Icon, Input, Menu} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './store/reducer';
import {toggleAnalyzeSegment, setSearchFilter} from './store/library-slice';
import {setNotation} from './store/chart-slice';
import {Link} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import {TChordNotation} from './types';

interface IRealBookHeader {
    displayType: 'playlist' | 'chart';
    header: string;
}

// eslint-disable-next-line complexity
export const RealBookHeader = React.memo((props: IRealBookHeader): ReactElement => {
    const {
        songs,
        activePlaylist,
        activeSong,
        searchFilter,
        showAnalyzeSegment
    } = useSelector((state: RootState) => state.library);
    const {notation} = useSelector((state: RootState) => state.chart);
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery({minWidth: 768});

    function handleToggleAnalyzeCharts() {
        dispatch(toggleAnalyzeSegment());
    }
    function handleClearFilter() {
        dispatch(setSearchFilter(''));
    }
    function handleSearchFilterChange(event: React.ChangeEvent, {value}: {value: string}) {
        dispatch(setSearchFilter(value));
    }
    function handleSetNotation(newNotation: TChordNotation) {
        return () => {
            if (notation === newNotation) {
                return;
            }
            dispatch(setNotation(newNotation));
        };
    }

    const rightMenu = props.displayType === 'chart' && (activeSong || activeSong === 0)
        ? (
            <Menu.Menu position="right">
                <Header as="h2" textAlign="right">
                    <Header.Content>
                        <Link to={`/${activePlaylist}`} title="You can press Esc or q to close the chart.">
                            <Icon name="angle double left" color="blue" style={{cursor: 'pointer'}} />
                        </Link>
                        {songs[activeSong].title}
                        <Header.Subheader>
                            {`${songs[activeSong].author} // ${songs[activeSong].style} // ${songs[activeSong].key}`}
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                    `${songs[activeSong].title} ${songs[activeSong].author}`
                                )}`}
                                title="Search song on YouTube"
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration: 'none', marginLeft: 5}}
                            >
                                <Icon name="youtube play" color="red" />
                            </a>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Menu.Menu>
        )
        : (
            <Menu.Menu position="right">
                {<Menu.Item>
                    <Icon
                        name="chart line"
                        style={{cursor: 'pointer'}}
                        title="Playlist Summary"
                        onClick={handleToggleAnalyzeCharts}
                        color={showAnalyzeSegment ? 'blue' : 'grey'}
                    />
                </Menu.Item>}
                {
                    searchFilter && searchFilter.trim() !== ''
                        ? (
                            <Menu.Item>
                                <Icon
                                    name="delete"
                                    color="red"
                                    title="Clear filter"
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClearFilter}
                                />
                            </Menu.Item>
                        )
                        : null
                }
                <Input
                    icon="search"
                    transparent
                    placeholder="Search..."
                    onChange={handleSearchFilterChange}
                    value={searchFilter}
                />
            </Menu.Menu>
        );
    const leftHeader = props.displayType === 'chart'
        ? (
            <Menu.Item>
                <Icon
                    name={'key'}
                    style={{cursor: 'pointer'}}
                    title="Normal"
                    onClick={handleSetNotation('symbolic')}
                    color={notation === 'symbolic' ? 'blue' : 'grey'}
                />
                <Icon
                    name={'subscript'}
                    style={{cursor: 'pointer'}}
                    title="Nashville Number System"
                    onClick={handleSetNotation('numeric')}
                    color={notation === 'numeric' ? 'blue' : 'grey'}
                />
                <Icon
                    name={'bold'}
                    style={{cursor: 'pointer'}}
                    title="Berklee"
                    onClick={handleSetNotation('berklee')}
                    color={notation === 'berklee' ? 'blue' : 'grey'}
                />
            </Menu.Item>
        )
        : isDesktop
            ? <Menu.Header style={{marginBottom: 0}} content={props.header} as="h2" />
            : <Menu.Item header content={props.header} />;

    return (
        <Menu secondary pointing>
            {leftHeader}
            {rightMenu}
        </Menu>
    );
});
