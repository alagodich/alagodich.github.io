import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlaylist, closeActiveChart} from './store/library-slice';
import {Link} from 'react-router-dom';
import {RootState} from './store/reducer';
import {Icon, List} from 'semantic-ui-react';

interface IRealBookPlaylist {
    name: string;
}

const maxSize = 50;

export const RealBookPlaylist = React.memo((props: IRealBookPlaylist): ReactElement => {
    const {name} = props;
    const dispatch = useDispatch();
    const {
        filteredSongs,
        error,
        isLoading,
        activePlaylist
    } = useSelector((state: RootState) => state.library);

    useEffect(() => {
        dispatch(closeActiveChart());
        if (activePlaylist !== name) {
            dispatch(fetchPlaylist(name));
        }
    }, [name]);

    if (!isLoading && !filteredSongs.length) {
        return <div>{'Nothing found, try different search criteria.'}</div>;
    }

    const charts = filteredSongs.slice(0, maxSize).map(chart => (
        <List.Item key={chart.id}>
            <Icon name="options"/>
            <List.Content>
                <Link to={`/${name}/${chart.id}`}>
                    {chart.title} <span style={{opacity: 0.5}}>{`--[${chart.author}]`}</span>
                </Link>
            </List.Content>
        </List.Item>
    ));

    const chartList = (
        <List className="chart-list">
            {charts}
            {filteredSongs.length > 50
                ? (
                    <p style={{marginTop: '1em'}}>
                        {`... and ${filteredSongs.length - maxSize} more, try narrowing the search.`}
                    </p>
                )
                : null}
        </List>
    );

    return isLoading
        ? <div>{'...loading'}</div>
        : error
            ? <div>{`Can't load playlist: ${error}`}</div>
            : chartList;
});
