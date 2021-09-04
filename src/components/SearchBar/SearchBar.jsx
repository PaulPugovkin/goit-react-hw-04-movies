import { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

const SearchBar = ({ handleOnSubmit }) => {
    const [searchQuery, setQuery] = useState('');

    const handleOnChange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        handleOnSubmit(searchQuery);
        setQuery('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <Input
                        icon={<Icon name="search" inverted circular link />}
                        placeholder="Search..."
                        onChange={handleOnChange}
                    />
                </label>
            </form>
        </>
    );
};

export default SearchBar;
