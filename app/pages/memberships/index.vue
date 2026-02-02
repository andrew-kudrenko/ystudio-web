<script setup lang="ts">
import { MembershipCard } from "~/modules/entities/memberships";

console.log("SUTRA");
</script>

<template>
  <UPage>
    <UPageHeader
      title="Цены и абонементы"
      description="На разный вкус и кошелёк"
    />

    <UPageBody>
      <UPricingPlans>
        <MembershipCard
          title="Одиночное занятие"
          description="Разовое посещение"
          :price="600"
          :features="[
            'Чай масала',
            'Поддержка преподавателя',
            'Йогический вайб',
          ]"
        />

        <MembershipCard
          title="Месяц База"
          description="4 недели по 2 занятия"
          :price="4500"
          :features="[
            'Регулярность',
            'Чай масала',
            'Поддержка преподавателя',
            'Йогический вайб',
            'Выгодное предложение',
          ]"
        />

        <MembershipCard
          title="Месяц Pro"
          description="4 недели по 3 занятия"
          :price="6500"
          :features="[
            'Регулярность',
            'Чай масала',
            'Поддержка преподавателя',
            'Йогический вайб',
            'Выгодное предложение',
          ]"
        />
      </UPricingPlans>
    </UPageBody>
  </UPage>
</template>
