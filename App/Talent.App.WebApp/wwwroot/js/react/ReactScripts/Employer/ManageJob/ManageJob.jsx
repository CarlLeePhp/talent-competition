import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

    loadData(callback) {
        // var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var link = 'https://talentservicestalent20230813232146.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        $.ajax({
            url: link
                + '?activePage=' + this.state.activePage
                + '&sortByDate=' + this.state.sortBy.date
                + '&showActive=' + this.state.filter.showActive
                + '&showClosed=' + this.state.filter.showClosed
                + '&showDraft=' + this.state.filter.showDraft
                + '&showExpired=' + this.state.filter.showExpired
                + '&showUnexpired=' + this.state.filter.showUnexpired,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                //let employerData = null;
                //if (res.employer) {
                //    employerData = res.employer
                //console.log("employerData", employerData)
                //}
                console.log(res.myJobs)
                this.setState({ loadJobs: res.myJobs });
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <Card.Group>
                        {this.state.loadJobs.map(job => {
                            let expiryDate = new Date(job.expiryDate);
                            job.expiryDate = expiryDate.toDateString();
                            return <JobSummaryCard loadJob={job} key={job.id} />;
                        }

                        )}
                    </Card.Group>
                    
                </div>

            </BodyWrapper>
        )
    }
}