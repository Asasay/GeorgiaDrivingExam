import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  question: {
    width: '100%',
    padding: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '600',
  },
  answersContainer: {
    width: '100%',
  },
  answer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 3,
    padding: 10,
  },
  answerText: {
    flex: 1,
    marginLeft: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bgGreen: {
    backgroundColor: 'rgba(102, 211, 255, 1)',
  },
  bgRed: {
    backgroundColor: 'rgba(255, 137, 125, 1)',
  },
  image: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
