import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = event => {
        const query = event.target.value;

        this.setState({query: query.trim()})
    };

    clearQuery = () => {
        this.setState({query: ''});
    };

    render() {
        const {contacts, onDeleteContact} = this.props;
        const {query} = this.state;

        let showingContacts = contacts;
        if (query) {
            const match = new RegExp(escapeStringRegexp(query), 'i');
            showingContacts = contacts.filter(contact => match.test(contact.name));
        }
        showingContacts.sort(sortBy('name'));

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={query}
                        onChange={this.updateQuery}
                    />
                    <Link
                        className="add-contact"
                        to="/create"
                    >
                        Add Contact
                    </Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>
                            Show all
                        </button>
                    </div>
                )}
                <ol className="contact-list">
                    {showingContacts.map(contact => (
                        <li
                            key={contact.id}
                            className="contact-list-item"
                        >
                            <div
                                className="contact-avatar"
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                            />
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button
                                className="contact-remove"
                                onClick={() => onDeleteContact(contact)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;