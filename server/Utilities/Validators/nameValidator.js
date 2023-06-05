export const validateName = (name) => {
    var re = /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ]{2,30}$/;
    return re.test(name);
};
