import configureStore from '../../redux/configureStore';

describe('Configure Store function', () => {
  it('should create dev store', () => {
    const store = configureStore({});
    expect(store).toBeDefined();
  })

  it('should create production store', () => {
    process.env.NODE_ENV = 'production';
    const store = configureStore({});
    expect(store).toBeDefined();
  })
});
