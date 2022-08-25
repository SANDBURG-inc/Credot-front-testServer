import React, { useState, useEffect, Component } from "react";
import AuthWrapper from "../components/auth/AuthWrapper";
import Form from "react-bootstrap/Form";
import AuthButton from "./../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { update, HOST } from "./../redux/store.js";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { render } from "@testing-library/react";

const Finance = () => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>계약일</TableCell>
            <TableCell>납부마감일</TableCell>
            <TableCell>금액</TableCell>
            <TableCell>커머스</TableCell>
            <TableCell>납부여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>0</TableCell>
            <TableCell>2022-06-21</TableCell>
            <TableCell>2022-12-31</TableCell>
            <TableCell>3,500,000</TableCell>
            <TableCell>쿠팡</TableCell>
            <TableCell>X</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Finance;
