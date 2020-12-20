import {Container, Pagination} from 'semantic-ui-react'
import {useRouter} from 'next/router'

function MyPagination({totalPages}) {

    const router = useRouter()

    return (
        <Container textAlign='center' style={{margin:'2em'}}>
            <Pagination 
                defaultActivePage={1}
                totalPages={totalPages}
                onPageChange={(event, data) => {
                    router.push(`/leaderboard?page=${data.activePage}`)
                }}
            ></Pagination>
        </Container>
    )
}

export default MyPagination;