import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Actions from '../Actions';
import Donate from '../Donate';
import Exhibitions from '../Exhibitions';
import Feed from '../Feed';
import Footer from '../Footer';
import ForumPosts from '../ForumPosts';
import Leaderboard from '../Leaderboard';
import Puzzle from '../Puzzle';
import Room from '../Room';
import TopGame from '../TopGame';
import Tournaments from '../Tournaments';
import TournamentWinners from '../TournamentWinners';
import Updates from '../Updates';
import { lichessSelector } from '../../../../redux/lichess';

export interface LobbyProps {
    className?: string;
}

export const Lobby: FC<LobbyProps> = ({
    className,
}) => {
    const {
        playerCount,
        gameCount,
        streamers,
        events,
        topGame,
        puzzle,
        lobby,
        gamesInPlay,
        leaderboard,
        tournamentWinners,
        players,
        tournaments,
        updates,
        forumPosts,
        history,
    } = useSelector(lichessSelector);

    console.log({
        playerCount,
        gameCount,
        streamers,
        events,
        topGame,
        puzzle,
        lobby,
        gamesInPlay,
        leaderboard,
        tournamentWinners,
        players,
        tournaments,
        updates,
        forumPosts,
        history,
    });

    return (
        <main className={cn(styles.root, className)}>
            <Feed
                className={styles.feed}
                streamers={streamers}
                events={events}
                history={history}
            />
            <TopGame
                className={styles.topGame}
                topGame={topGame}
            />
            <Footer className={styles.footer}/>
            <Room
                className={styles.room}
                lobby={lobby}
                numGamesInPlay={gamesInPlay.length}
                gamesInPlay={gamesInPlay}
            />
            <Leaderboard
                className={styles.leaderboard}
                leaderboard={leaderboard}    
            />
            <TournamentWinners
                className={styles.tournamentWinners}
                tournamentWinners={tournamentWinners}    
            />
            <Updates className={styles.updates}/>
            <Tournaments className={styles.tournaments}/>
            <Exhibitions className={styles.exhibitions}/>
            <ForumPosts className={styles.forumPosts}/>
            <Actions
                className={styles.actions}
                playerCount={playerCount}
                gameCount={gameCount}
            />
            <Puzzle className={styles.puzzle} puzzle={puzzle}/>
            <Donate className={styles.donate}/>
        </main>
    );
};

export default Lobby
