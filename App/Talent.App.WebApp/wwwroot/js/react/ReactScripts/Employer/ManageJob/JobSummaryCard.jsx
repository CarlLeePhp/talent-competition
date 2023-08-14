import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.loadJob.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Expiry Date: {this.props.loadJob.expiryDate} </span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.loadJob.summary}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button icon labelPosition='left' size='mini'>
                        <Icon name='file' />
                        Create
                    </Button>
                    <Button icon labelPosition='left' size='mini'>
                        <Icon name='edit' />
                        Edit
                    </Button>
                    
                </Card.Content>
            </Card>
        );
    }
}