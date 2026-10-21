function base62Encode(id)
{
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shortCode = '';
    if(id === 0)
        return chars[0];

    while(id > 0)
    {
        var remainder = id % 62;
        shortCode += chars[remainder];
        id = Math.floor(id / 62);
    }

    return shortCode.split('').reverse().join('');
}

export default base62Encode;