import React, {useEffect, useContext, useState} from 'react';
import {PropTypes} from 'prop-types';

import {Modal, View, StyleSheet} from 'react-native';
export default function Popup({children}) {
  return (
    <>
      <View style={styles.modalContainer}>
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>{children}</View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.overlay}></View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    flex: 1,
    zIndex: 5,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    padding:10,
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
  },
  txtBox: {
    marginTop: 20,
  },
  headingStyle: {
    fontSize: 14,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  btnBox: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 5,
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  modalBtn: {
    paddingHorizontal: 10,
    height: 35,
    width: 100,
  },
  modalIcon: {
    marginTop: 50,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 3,
    elevation: 3,
  },
});
