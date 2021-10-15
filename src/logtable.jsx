import React, {useEffect, useState} from 'react'
import './table.css'
import axios from 'axios';
// import JSONData from './sampletable.json'

const endpoint = "https://acm.savaal.xyz/leaderboard";

const get_leaderboard_data = () => {
    return new Promise ((resolve, reject) => {
        axios
            .get(endpoint)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    });
};

const Scores = props => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        get_leaderboard_data()
            .then(data => {
                setScores(data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    return (
        <table align="center">
            <thead>
                <tr>
                    <th> Contributor </th>
                    <th> Repository </th>
                    <th> Issue Number </th>
                    <th> Bounty </th>
                </tr>
            </thead>
            <tbody>
            {(scores &&
                scores.map(score => {
                    return <tr key={score._id}> 
                    <td> {score.contributor} </td>
                    <td> {score.repository} </td>
                    <td> <a href={score.html_url}> {score.issue_number} </a> </td>
                    <td> {score.points} </td>
                    </tr>
                }))
            }
            </tbody>
        </table>
    )

};
export default Scores;
