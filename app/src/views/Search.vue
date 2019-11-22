<template>
    <div id="Search"> 
      <search-bar />
    </div>
</template>

<script>
// this is page for search.
// import banner, search-card(containing search query and selection cards, question-board(with question-cards(component)) component. Fill in banner plz.
    export default {
        name: 'Search',
        components: {
          SearchBar: () => import('@/components/SearchBar')
        }
    }
</script>