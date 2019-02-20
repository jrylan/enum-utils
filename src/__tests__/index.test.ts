import { EnumUtils } from '../index'

describe('Array input', () => {
  const arr: string[] = ['bar', 'foo']

  test('Values by key', () => {
    expect(EnumUtils.valuesByKey(arr)).toEqual({
      bar: 'bar',
      foo: 'foo'
    })
  })

  test('Values', () => {
    expect(EnumUtils.values(arr)).toEqual(['bar', 'foo'])
  })

  test('Keys', () => {
    expect(EnumUtils.keys(arr)).toEqual(['bar', 'foo'])
  })
})

test('Set', () => {
  expect(EnumUtils.values(new Set<string>(['foo', 'bar']))).toEqual([
    'foo',
    'bar'
  ])
})

test('Map', () => {
  const m = new Map<string, string>([['foo', 'bar']])

  expect(EnumUtils.values(m)).toEqual(['bar'])

  expect(EnumUtils.valuesByKey(m)).toEqual({ foo: 'bar' })

  expect(EnumUtils.keysByValue(m)).toEqual({ bar: 'foo' })
})

test('Valid enum', () => {
  const obj = { Hello: 'world', Foo: 5 }
  expect(EnumUtils.values(obj)).toEqual(['world', 5])
  expect(EnumUtils.keys(obj)).toEqual(['Hello', 'Foo'])
})

test('Reverse mapping enum', () => {
  const obj = { Hello: 1, Foo: 2, 1: 'Hello', 2: 'Foo' }

  expect(EnumUtils.keys(obj)).toEqual(['Hello', 'Foo'])
  expect(EnumUtils.values(obj)).toEqual([1, 2])
  expect(EnumUtils.entries(obj)).toEqual([['Hello', 1], ['Foo', 2]])
})

test('Almost reverse mapping enum', () => {
  const obj = {
    1: 'Foo',
    2: 'Hello',
    Foo: 1,
    Hello: 2,
    Hello2: 'hello'
  }

  expect(EnumUtils.keys(obj)).toEqual(['1', '2', 'Foo', 'Hello', 'Hello2'])
  expect(EnumUtils.values(obj)).toEqual(['Foo', 'Hello', 1, 2, 'hello'])
})

test('Invalid enum', () => {
  expect(EnumUtils.entries({ Hello: { foo: 'bar' } })).toEqual([])
})

test('Undefined', () => {
  expect(EnumUtils.keys(undefined)).toEqual([])
})

test('Null', () => {
  expect(
    EnumUtils.values(
      // tslint:disable-next-line no-null-keyword
      null
    )
  ).toEqual([])
})
