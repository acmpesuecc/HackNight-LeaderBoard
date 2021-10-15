import React from "react";
import './table.css'
import JSONData from './sampletable.json'

const axios = require('axios');

function JSONreturn() {
    axios.get('http://142.93.216.101:3000/leaderboard').then(function (response) {
        let x = new Promise((resolve, reject) => {
            if(response.status === 200) {
                resolve(JSON.parse(response.request.responseText));
            }else{
                reject("Error!");
            }
        });
        x.then(function (value){
            return value;
        }, function (err) {
            return err;
        });
    });
}

function JsonDataDisplay() {
    var x = JSONreturn();
    console.log(x)
    const displayData = JSONData.map((info) => {
        return (
            <tr>
                <td>{info.contributor}</td>
                <td>{info.repository}</td>
                <td>{info.issue_number}</td>
                <td>{info.maintainer}</td>
                <td>{info.points}</td>
            </tr>
        );
    });
    return (
        <div>
            <table className="table table-striped" border="1px solid">
                <thead>
                    <tr>
                        <th>Contributor </th>
                        <th>Repository Contributed to</th>
                        <th>Issue Number</th>
                        <th>Maintainer</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
        </div>
    );
}
export default JsonDataDisplay;