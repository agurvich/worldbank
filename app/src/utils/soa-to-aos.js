function transposeSoAtoAoS(dataSoA) {
    const keys = Object.keys(dataSoA);
    const length = dataSoA[keys[0]].length;
    const dataAoS = [];

    for (let i = 0; i < length; i++) {
        const entry = {};
        keys.forEach(key => {
            entry[key] = dataSoA[key][i];
        });
        dataAoS.push(entry);
    }

    return dataAoS;
}

export default transposeSoAtoAoS;