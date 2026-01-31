export function useApi() {
  const getExample = () => useFetch('/api/example')

  return { getExample }
}
