import {Table, Item, Image, Header, Input, Button} from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import React from 'react'
import Link from 'next/link'

function ArticleItem({article}) {

    
    return (<>
    
    <br></br><br></br>
    <Item>
        <Item.Image size='small' src={article.image} />

        <Item.Content>
            <Item.Header as='h2'>
                <Link href={article.url}>{article.headline}</Link>
            </Item.Header><br></br>
            <Header as='h4'>{article.source}</Header>
            <Item.Description>{article.summary.slice(0,200) + '...'}</Item.Description>
        </Item.Content>
    </Item>
    </>
    )
}
export default ArticleItem;