import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
import { useStore } from '../components/GlobalVariables';


const IndividualXO = (currentBox, active_block) => {
    var active_Status = active_block[currentBox]
    var boxNo = currentBox

    var active_player = useStore(state => state.active_player);
    var setActive_player = useStore(state => state.setActive_player);
    var markers = useStore(state => state.markers);
    var setWholeMarkers = useStore(state => state.setWholeMarkers);
    var boxStatus = useStore(state => state.boxStatus);
    var setBoxStatus = useStore(state => state.setBoxStatus);


    var setActive_block = useStore(state => state.setActive_block);
    var reset_Active_Block = useStore(state => state.reset_Active_Block);
    var active_Status1 = false;

    var super_reset_Active_Block = useStore(state => state.super_reset_Active_Block);

    var alert_border = '#fff'


    if (active_Status === 1) {
        active_Status1 = false
        var count = 0
        for (i = 0; i < 9; i++) {
            if (active_block[i] == 1) {
                count++
            }
            if (count > 1) {
                alert_border = "#fff"
                break
            }
            else {

                alert_border = active_player == 'X' ? '#007FF4' : '#F40075'
            }
        }
    }
    else {
        active_Status1 = true
    }

    // Add marker on clicked position
    const markPosition = (position) => {
        if (!markers[boxNo][position]) {
            let temp = [...markers]
            temp[boxNo][position] = active_player
            setWholeMarkers(temp)
            if (active_player === 'X') {  //transfer chances to next player
                setActive_player('O')
            } else {
                setActive_player('X')
            }

            reset_Active_Block()
            if (boxStatus[position] == null) {
                setActive_block(position, 1)
            }
            else { super_reset_Active_Block() }



        }
    }

    //Function to calculate winner
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[boxNo][a] && squares[boxNo][a] === squares[boxNo][b] && squares[boxNo][a] === squares[boxNo][c]) {
                if (squares[boxNo][a] === 'X' && boxStatus[boxNo] === null) {
                    setBoxStatus(boxNo, 'XWon')

                }
                else if (squares[boxNo][a] === 'O' && boxStatus[boxNo] === null) {
                    setBoxStatus(boxNo, 'OWon')
                }
                return squares[boxNo][a];
            }
        }
        return null;
    }


    //UseEffect to call each time any player plays 
    useEffect(() => {
       calculateWinner(markers);
    }, [markers, boxStatus])



    return (

        <SafeAreaView style={[styles.mainContainer, { padding: 2, paddingVertical: 5, borderWidth: 3, borderColor: alert_border }]}>

            {boxStatus[boxNo] === null ? (
                <>
                    {/* Top Left Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellR, styles.cellD]} onPress={() => markPosition(0)}>

                        {markers[boxNo][0] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][0] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}

                    </TouchableOpacity>

                    {/* Top Mid Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellD, styles.cellR]} onPress={() => markPosition(1)}>
                        {markers[boxNo][1] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][1] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>



                    {/* Top Right Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellD]} onPress={() => markPosition(2)}>
                        {markers[boxNo][2] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][2] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}

                    </TouchableOpacity>

                    {/* Mid Left Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellR, styles.cellD]} onPress={() => markPosition(3)}>
                        {markers[boxNo][3] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][3] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>

                    {/* Mid Mid Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellR, styles.cellD]} onPress={() => markPosition(4)}>
                        {markers[boxNo][4] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][4] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>

                    {/* Mid Right Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellD]} onPress={() => markPosition(5)}>
                        {markers[boxNo][5] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][5] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>

                    {/* Bottom Left Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellR]} onPress={() => markPosition(6)}>
                        {markers[boxNo][6] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][6] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>

                    {/* Bottom Mid Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell, styles.cellR,]} onPress={() => markPosition(7)}>
                        {markers[boxNo][7] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][7] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>

                    {/* Bottom Right Cell */}
                    <TouchableOpacity disabled={active_Status1} style={[styles.cell]} onPress={() => markPosition(8)}>
                        {markers[boxNo][8] === 'X' && <Image source={require('../assets/img/cross.png')} style={styles.icon} />}
                        {markers[boxNo][8] === 'O' && <Image source={require('../assets/img/zero.png')} style={styles.icon} />}
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {boxStatus[boxNo] === 'XWon' && boxStatus[boxNo] !== null && <Image source={require('../assets/img/cross.png')} style={styles.BigIcon} />}
                    {boxStatus[boxNo] === 'OWon' && boxStatus[boxNo] !== null && <Image source={require('../assets/img/zero.png')} style={styles.BigIcon} />}
                </>)
            }
        </SafeAreaView>


    )
}

export default IndividualXO

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    cell: {
        width: windowWidth / (11.5),
        height: windowWidth / (11.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    }
    ,
    cellR: { borderRightWidth: 2 },
    cellD: { borderBottomWidth: 2 },
    icon: {
        height: 30,
        width: 30
    },
    BigIcon: {
        height: 100,
        width: 100
    }
})