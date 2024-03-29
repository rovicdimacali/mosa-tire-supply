<template>
  <div class="activity-logs-page">
    <div class="activity-logs col">
      <h1>Activity Logs</h1>
      <DataTable
        :value="activityLogs?.content"
        scrollable
        scrollHeight="calc(70vh - 100px)"
        class="online-orders-table"
      >
        <Column field="dateCreated" header="Log Date" style="min-width: 250px">
        </Column>
        <Column field="activity" header="Activity" style="min-width: 100px">
        </Column>
      </DataTable>
      <Paginator
        :rows="activityLogs?.pageable.pageSize"
        :totalRecords="activityLogs?.totalElements"
        :first="currentPage * activityLogs?.pageable.pageSize"
        @page="changePage"
      ></Paginator>
    </div>
  </div>
</template>

<script>
import { getActivityLogs } from "@/services/Admin/ActivityLogs";
export default {
  props: ["page"],
  data() {
    return {
      activityLogs: null,
      currentPage: null,
    };
  },

  methods: {
    async fetchActivityLogs(page) {
      try {
        const response = await getActivityLogs(page);
        this.activityLogs = response || [];
      } catch (error) {}
    },

    changePage(event) {
      let page = event.page;
      this.$router.push({ path: this.$route.path, query: { page } });
    },
  },

  watch: {
    // Watch for changes in the query parameter
    "$route.query.page": {
      handler(newPage) {
        this.fetchActivityLogs(newPage ? parseInt(newPage) : 0);
      },
      immediate: true, // Call the handler immediately on component mount
    },
  },

  mounted() {
    this.currentPage = this.page ? parseInt(this.page) : 0;
    this.fetchActivityLogs(this.page ? parseInt(this.page) - 1 : 0);
  },
};
</script>
