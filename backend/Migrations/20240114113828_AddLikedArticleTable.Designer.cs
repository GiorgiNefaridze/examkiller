﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ExamKillerDbContext))]
    [Migration("20240114113828_AddLikedArticleTable")]
    partial class AddLikedArticleTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Article", b =>
                {
                    b.Property<int>("ArticleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ArticleId"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer");

                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ArticleId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("RoomId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("EnrollUser", b =>
                {
                    b.Property<int>("EnrollUserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("EnrollUserId"));

                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("EnrollUserId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("EnrollUsers");
                });

            modelBuilder.Entity("LikedArticle", b =>
                {
                    b.Property<int>("LikedArticleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("LikedArticleId"));

                    b.Property<int>("ArticleId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("LikedArticleId");

                    b.HasIndex("ArticleId");

                    b.HasIndex("UserId");

                    b.ToTable("LikedArticles");
                });

            modelBuilder.Entity("Room", b =>
                {
                    b.Property<int>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoomId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RoomId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Article", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnrollUser", b =>
                {
                    b.HasOne("Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LikedArticle", b =>
                {
                    b.HasOne("Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Room", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
