    import React from "react";

    function Form({ q, handleInputChange, handleFormSubmit }) {
    return (
        <form>
        <div className="form-group">
            <label htmlFor="Search">
            <strong>Book</strong>
            </label>
            <input
            className="form-control"
            id="Title"
            type="text"
            value={q}
            placeholder="Let's find it"
            name="q"
            onChange={handleInputChange}
            required
            />
        </div>
        <div className="pull-right">
            <button
            onClick={handleFormSubmit}
            type="submit"
            className="btn btn-lg btn-danger float-right">
            Search
            </button>
        </div>
        </form>
    );
    }

    export default Form;