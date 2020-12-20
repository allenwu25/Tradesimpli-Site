import axios from 'axios'
import {parseCookies} from 'nookies'
import baseUrl from '../utils/baseUrl'
import {Header, Icon, Rating, Table} from 'semantic-ui-react'
import MyPagination from '../components/Leaderboard/MyPagination'

function Leaderboard({userdata, yourrank,totalusers, totalpages}) {
    
    return (
        <center>
            <Header as='h1' icon textAlign='center'>
                <Icon name='trophy' circular />
                <Header.Content>Current Leaderboard</Header.Content>
            </Header>
            <Header as='h4'>Your Current Rank is {parseInt(yourrank + 1)} out of {parseInt(totalusers)} users</Header>
            <Table celled padded>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Rank</Table.HeaderCell>
                            <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Total Account Value</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>

                    {userdata.map((user) => 
                        <Table.Row>
                            <Table.Cell>
                            <Header as='h4'>
                                {user[3]}
                            </Header>
                            </Table.Cell>
                            <Table.Cell singleLine>{user[0]} | {user[2]}</Table.Cell>
                            <Table.Cell>
                                ${user[1].toFixed(2)}
                            </Table.Cell>
                        </Table.Row>
                    )}
                    
                    </Table.Body>
                </Table>

                <MyPagination totalPages={totalpages}></MyPagination>
        </center>
    )
}


Leaderboard.getInitialProps = async ctx => {
    const page = ctx.query.page? ctx.query.page : "1";
    const size = 10;
    const {token} = parseCookies(ctx)
    if (token) {
        const url = `${baseUrl}/api/leaderboard`
        const payload = { headers: {Authorization: token}, params: {page, size}}
        const rankdata = (await axios.get(url, payload)).data
        const rankings = rankdata.sorted
        const rank = rankdata.index
        const totalusers = rankdata.total
        return {userdata: rankings, yourrank: rank, totalusers: totalusers, totalpages: Math.ceil(totalusers/size)}    
    }
    return {userdata: {}, yourrank:0}
}

export default Leaderboard;