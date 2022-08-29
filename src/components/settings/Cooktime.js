function Cooktime() {
    return (
        <>
            <h2>Duration</h2>
            <div>
                <input type="radio" id="short" name="duration" value="short"
                        defaultChecked />
                <label htmlFor="short">Short</label>
            </div>
            <div>
                <input type="radio" id="medium" name="duration" value="medium" />
                <label htmlFor="medium">Medium</label>
            </div>
            <div>
                <input type="radio" id="long" name="duration" value="long" />
                <label htmlFor="long">Long</label>
            </div>
        </>
    )
}

export default Cooktime