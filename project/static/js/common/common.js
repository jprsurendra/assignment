function set_default_value(optional_value, default_value) {
    if (optional_value === undefined || typeof optional_value === 'undefined') {
        // console.log("optional_value is undefined");
        return default_value;
    }
    return optional_value;
}